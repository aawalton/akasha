import { dirname, join } from "node:path"

export const PAGE = "akasha/one/amy.seat.ts"

export const ROUNDS = 6

export const OWNERS = ["beats", "gateway", "usage"]

const CODE_AT = join(dirname(import.meta.path), "page-uncommitted.module.code.ts")

export function bunning(said: string): Bun.Subprocess {
  return Bun.spawn(["bun", "-e", said], { stderr: "inherit", stdout: "inherit" })
}

export function merging(root: string, key: string, ready: string, go: string): string {
  return `import { mergeUncommitted } from ${JSON.stringify(CODE_AT)}
import { existsSync, writeFileSync } from "node:fs"
writeFileSync(${JSON.stringify(ready)}, "ready")
while (!existsSync(${JSON.stringify(go)})) Bun.sleepSync(1)
for (let n = 0; n < ${ROUNDS}; n += 1) {
  mergeUncommitted(${JSON.stringify(root)}, ${JSON.stringify(PAGE)}, { ${key}: n })
}`
}

export function counting(root: string, ready: string, go: string): string {
  return `import { changeUncommitted } from ${JSON.stringify(CODE_AT)}
import { existsSync, writeFileSync } from "node:fs"
writeFileSync(${JSON.stringify(ready)}, "ready")
while (!existsSync(${JSON.stringify(go)})) Bun.sleepSync(1)
for (let n = 0; n < ${ROUNDS}; n += 1) {
  changeUncommitted(${JSON.stringify(root)}, ${JSON.stringify(PAGE)}, (held) => ({
    counted: Number(held?.counted ?? 0) + 1,
  }))
}`
}

export function writing(root: string, rounds: number, size: number): string {
  return `import { mergeUncommitted } from ${JSON.stringify(CODE_AT)}
const body = "x".repeat(${size})
for (let n = 0; n < ${rounds}; n += 1) {
  mergeUncommitted(${JSON.stringify(root)}, ${JSON.stringify(PAGE)}, { n, body })
}`
}

export async function gonePid(): Promise<number> {
  const kid = bunning("Bun.sleepSync(60000)")
  kid.kill("SIGKILL")
  await kid.exited
  return kid.pid
}
