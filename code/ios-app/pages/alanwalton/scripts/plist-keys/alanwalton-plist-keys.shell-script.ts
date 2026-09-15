import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonPlistKeys = {
  id: "01a0595b-ef5e-7355-9321-5105aa180e67",
  type: "page-type/shell-script",
  slug: "alanwalton-plist-keys",
  definition: "the Info.plist keys the seam writes with PlistBuddy",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The plist has the health update usage key though nothing here writes health data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Apple validates an upload against the HealthKit entitlement rather than the calls made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upload missing that key is refused with error 90683.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Deleting the key to narrow the request burns a release rather than tightening a release.",
    },
  ],
} as const satisfies ShellScript
