export const PLANTED = "planted-secret"

export const SECRET_PLACES: readonly string[] = [
  ".secrets.env",
  ".secrets.env.bak",
  ".config/sops/age/keys.txt",
  ".ssh/id_ed25519",
  ".kube/config",
  ".claude/accounts/one/.credentials.json",
]

export const OPEN_PLACE = "notes/open.txt"

export function readsNoSecret(home: string): string {
  const secret = SECRET_PLACES.map((one) => `${home}/${one}`)
  return (
    'import { expect, test } from "bun:test"\n' +
    'import { readdirSync, readFileSync } from "node:fs"\n' +
    "function readOf(at: string): string {\n" +
    '  try { return readFileSync(at, "utf8") } catch { return "" } }\n' +
    'test("one", () => {\n' +
    `  expect(readOf(${JSON.stringify(`${home}/${OPEN_PLACE}`)})).toBe("${PLANTED}")\n` +
    `  for (const at of ${JSON.stringify(secret)})\n` +
    `    expect(readOf(at)).not.toContain("${PLANTED}")\n` +
    '  for (const one of readdirSync("/proc").filter((two) => /^\\d+$/.test(two)))\n' +
    `    expect(readOf(\`/proc/\${one}/environ\`)).not.toContain("${PLANTED}")\n` +
    "})\n"
  )
}
