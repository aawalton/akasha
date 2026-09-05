import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const stateReading = {
  id: "01a072b8-a766-7b44-b1e8-c0c04920e385",
  pageTypeSlug: "module",
  slug: "state-reading",
  definition: "how a part of the editor reads the one file that part draws",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is watched rather than the file, a write replacing the file itself.",
    },
    {
      invariantKind: "departure",
      statement: "One watcher serves every part of the editor rather than one watcher each.",
    },
    {
      invariantKind: "departure",
      statement: "A part draws the state already there before any change arrives.",
    },
    {
      invariantKind: "departure",
      statement: "A read that failed draws nothing, leaving the last good read on the screen.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding the same bytes as the last read is drawn no second time.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds a timer, the cooldown being the service's.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works a picture out from the repository.",
    },
  ],
} as const satisfies Module
