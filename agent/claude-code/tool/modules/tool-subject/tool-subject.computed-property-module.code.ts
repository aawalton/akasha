const SUBJECT_FIELDS: Readonly<Record<string, readonly string[]>> = {
  Bash: ["command"],
  Read: ["file_path"],
  Write: ["file_path"],
  Edit: ["file_path"],
  NotebookEdit: ["notebook_path"],
  Grep: ["pattern"],
  Glob: ["pattern"],
  Agent: ["description"],
  Task: ["description"],
  WebFetch: ["url"],
  WebSearch: ["query"],
  SendMessage: ["summary"],
}

const SUBJECT_LIMIT = 200

function firstLine(value: string): string {
  const flattened = value.replace(/\s+/g, " ").trim()
  return flattened.length > SUBJECT_LIMIT ? `${flattened.slice(0, SUBJECT_LIMIT - 1)}…` : flattened
}

function said(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== ""
}

export function toolSubject(name: string, input: unknown): string {
  if (input === null || typeof input !== "object" || Array.isArray(input)) return ""
  const record = input as Readonly<Record<string, unknown>>
  for (const field of SUBJECT_FIELDS[name] ?? []) {
    const value = record[field]
    if (said(value)) return firstLine(value)
  }
  for (const value of Object.values(record)) {
    if (said(value)) return firstLine(value)
  }
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "number" || typeof value === "boolean") {
      return firstLine(`${key}=${String(value)}`)
    }
  }
  return ""
}
