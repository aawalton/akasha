import { z } from "zod"

export const CONTACTS_SOURCE_SEPARATOR = "__IMESSAGE_CONTACTS_DB__"

const contactRowSchema = z
  .object({
    pk: z.number(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    organization: z.string().nullable(),
    kind: z.enum(["phone", "email", "none"]),
    value: z.string().nullable(),
  })
  .strict()

const contactRowsSchema = z.array(contactRowSchema)

export interface Contact {
  readonly name: string
  readonly phones: readonly string[]
  readonly emails: readonly string[]
}

export function normalizePhone(input: string): string {
  return input.replace(/\D/g, "")
}

export function handleKey(id: string): string {
  if (id.includes("@")) return id.trim().toLowerCase()
  const digits = normalizePhone(id)
  return digits.length > 10 ? digits.slice(-10) : digits
}

export function isEmailLike(input: string): boolean {
  return input.includes("@")
}

export function isPhoneLike(input: string): boolean {
  const trimmed = input.trim()
  return /\d/.test(trimmed) && /^[+]?[\d\s().-]+$/.test(trimmed)
}

export function buildContactsSql(): string {
  return `
SELECT r.Z_PK AS pk, r.ZFIRSTNAME AS first_name, r.ZLASTNAME AS last_name,
       r.ZORGANIZATION AS organization, 'phone' AS kind, p.ZFULLNUMBER AS value
FROM ZABCDRECORD r JOIN ZABCDPHONENUMBER p ON p.ZOWNER = r.Z_PK
UNION ALL
SELECT r.Z_PK, r.ZFIRSTNAME, r.ZLASTNAME, r.ZORGANIZATION, 'email', e.ZADDRESS
FROM ZABCDRECORD r JOIN ZABCDEMAILADDRESS e ON e.ZOWNER = r.Z_PK
UNION ALL
SELECT r.Z_PK, r.ZFIRSTNAME, r.ZLASTNAME, r.ZORGANIZATION, 'none', NULL
FROM ZABCDRECORD r
`.trim()
}

export function buildContactsScript(): string {
  const b64 = Buffer.from(buildContactsSql(), "utf8").toString("base64")
  return [
    `set -euo pipefail`,
    `sql="$(printf %s '${b64}' | base64 -D 2>/dev/null || printf %s '${b64}' | base64 -d)"`,
    `shopt -s nullglob`,
    `for db in "$HOME/Library/Application Support/AddressBook/Sources"/*/AddressBook-v22.abcddb; do`,
    `  echo "${CONTACTS_SOURCE_SEPARATOR}"`,
    `  /usr/bin/sqlite3 -json "$db" "$sql" 2>/dev/null || true`,
    `done`,
  ].join("\n")
}

function contactName(row: z.infer<typeof contactRowSchema>): string {
  const personal = [row.first_name ?? "", row.last_name ?? ""]
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(" ")
  if (personal.length > 0) return personal
  return (row.organization ?? "").trim()
}

export function parseContactsOutput(stdout: string): readonly Contact[] {
  const merged = new Map<
    string,
    { name: string; phones: Map<string, string>; emails: Map<string, string> }
  >()
  for (const chunk of stdout.split(CONTACTS_SOURCE_SEPARATOR)) {
    const body = chunk.trim()
    if (body.length === 0) continue
    const rows = contactRowsSchema.parse(JSON.parse(body))
    for (const row of rows) {
      const name = contactName(row)
      if (name.length === 0) continue
      const key = name.toLowerCase()
      const entry = merged.get(key) ?? { name, phones: new Map(), emails: new Map() }
      merged.set(key, entry)
      const value = (row.value ?? "").trim()
      if (value.length === 0) continue
      if (row.kind === "phone" && !entry.phones.has(handleKey(value))) {
        entry.phones.set(handleKey(value), value)
      }
      if (row.kind === "email" && !entry.emails.has(handleKey(value))) {
        entry.emails.set(handleKey(value), value)
      }
    }
  }
  return [...merged.values()]
    .map((entry) => ({
      name: entry.name,
      phones: [...entry.phones.values()],
      emails: [...entry.emails.values()],
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function searchContacts(contacts: readonly Contact[], query: string): readonly Contact[] {
  const needle = query.trim().toLowerCase()
  return contacts.filter((c) => c.name.toLowerCase().includes(needle))
}

export function contactHandleKeys(contact: Contact): ReadonlySet<string> {
  return new Set([...contact.phones, ...contact.emails].map(handleKey))
}

export function buildNameIndex(contacts: readonly Contact[]): ReadonlyMap<string, string> {
  const index = new Map<string, string>()
  for (const contact of contacts) {
    for (const key of contactHandleKeys(contact)) {
      if (!index.has(key)) index.set(key, contact.name)
    }
  }
  return index
}
