import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonIosSeam = {
  id: "01a0595b-ef5b-71a6-8bd8-99956227603e",
  type: "page-type/shell-script",
  slug: "alanwalton-ios-seam",
  definition: "the native layer written into Alan's generated Xcode project",
  shell: "sh",
  sourced: false,
  scripting: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The directory the icon is decoded into is taken away when the run ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That directory is taken away whether the run finishes or refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A removal that refuses leaves the run's own exit status as it was.",
    },
  ],
} as const satisfies ShellScript
