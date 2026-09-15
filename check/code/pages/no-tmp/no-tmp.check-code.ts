import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noTmp = {
  id: "01a04ecb-5cd1-7000-8159-83b7e93d72b9",
  type: "check-code",
  slug: "no-tmp",
  definition: "the check refusing a reach for /tmp, where no scratch of ours sits",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "`tmpdir` is refused where `tmpdir` is taken from `node:os`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A literal is judged by the value the literal has rather than by the text around the literal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A template is judged by its head alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is matched from its first character.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type says whether the paths its pages spell are a container's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page says the same of its own paths.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whatever the page says is read first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file whose page type says so is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type's claim about its pages holds for the files beside those pages.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A reach for /tmp through a variable is not seen.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A reach for /tmp through an environment read is not seen.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A reach for /tmp outside TypeScript is not seen.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
