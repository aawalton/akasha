import type { Command } from "../command.page-type.ts"

export const read = {
  id: "01a04bec-10b4-7e86-aeae-ed252396f186",
  pageTypeSlug: "command",
  slug: "read",
  definition: "the command returning the whole body of each akasha file it is named",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["page-type/command"],
  design: [
    "A read returns the whole file, because nothing here records what a reader last saw.",
    "A read of a body that is not UTF-8 text returns what it is instead of the body.",
    "A read takes no line range.",
    "A read too big for one answer returns fewer files and how to ask for the rest.",
    "A body past what one answer holds returns what it is, and no call returns it.",
    "A read reaches no file outside the akasha folder.",
    "The line numbers a read prints are not part of the file.",
    "The call for what is left over is priced as it is printed, so the answer naming it still fits.",
  ],
} as const satisfies Command
