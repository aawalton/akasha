import type { CodeCheck } from "../../code-check.page-type.ts"

export const noTmp = {
  id: "01a04ecb-5cd1-7000-8159-83b7e93d72b9",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-tmp",
  definition: "the check refusing a reach for /tmp, where no scratch of ours sits",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "`tmpdir` is refused where `tmpdir` is taken from `node:os`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A literal is judged by the value the literal has rather than by the text around the literal.",
    },
    {
      invariantKind: "departure",
      statement: "A template is judged by its head alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path is matched from its first character.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says whether the paths its pages spell are a container's.",
    },
    {
      invariantKind: "departure",
      statement: "A page says the same of its own paths, and what the page says is read first.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose page type says so is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's claim about its pages holds for the files beside those pages.",
    },
    {
      invariantKind: "gap",
      statement: "A reach for /tmp through a variable is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A reach for /tmp through an environment read is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A reach for /tmp through a re-export is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A reach for /tmp outside TypeScript is not seen.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
