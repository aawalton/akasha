import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function globally(body: string): string {
  return `export const away = 1\n\ndeclare global {\n${body}}\n`
}

export function indented(body: string): string {
  return body.replace(/^(?=.)/gm, "  ")
}

export function reasoned(said: readonly Judged[]): string {
  return said.map((each) => `${each.path} ${each.reason}`).join("\n")
}
