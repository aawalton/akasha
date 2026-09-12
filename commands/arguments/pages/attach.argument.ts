import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const attach = {
  id: "01a094ef-0594-77d6-b8f2-bdd5499848e0",
  type: "argument",
  slug: "attach",
  said: "--attach",
  takes: "a file to hang off the mail, said again for each",
  value: "path",
  placeholder: "path",
  repeats: true,
} as const satisfies Argument
