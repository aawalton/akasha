import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const buildFolderIsIgnored = {
  id: "01a0d926-3ca6-7478-a7a6-55dd5c37f218",
  type: "page-type/check-code",
  slug: "build-folder-is-ignored",
  definition: "the check refusing a page whose build folder git does not ignore",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which properties name a build folder is read from the index rather than from a list here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page names a build folder by stating that property true.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is found under the folder the page sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether git ignores a folder is answered by git reading the .gitignore files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The .gitignore files git reads are the ones the change leaves.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ignore rule outside a .gitignore file counts here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder whose files are ignored and which is not ignored itself is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a .gitignore file judges every page naming a build folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a build folder property judges every page naming a build folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other change judges the pages the change has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is filed at the page naming the folder.",
    },
  ],
  check: { maxCpuSeconds: 3 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
