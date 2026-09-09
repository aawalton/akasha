import type { ShellScript } from "@akasha/code/shell-script"

export const alanwaltonPlistKeys = {
  id: "01a0595b-ef5e-7355-9321-5105aa180e67",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-plist-keys",
  definition: "the Info.plist keys the seam writes with PlistBuddy",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The plist has the health update usage key though nothing here writes health data.",
    },
    {
      invariantKind: "departure",
      statement:
        "Apple validates an upload against the HealthKit entitlement rather than the calls made.",
    },
    {
      invariantKind: "departure",
      statement: "An upload missing that key is refused with error 90683.",
    },
    {
      invariantKind: "departure",
      statement:
        "Deleting the key to narrow what is asked for burns a release rather than tightening one.",
    },
  ],
} as const satisfies ShellScript
