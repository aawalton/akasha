import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const moduleSitsUnderAModulesFolder = {
  id: "01a095ee-d67a-7507-8e3e-82b54865302b",
  type: "check-code",
  slug: "module-sits-under-a-modules-folder",
  definition: "the check refusing a module page whose folder sits under no modules folder",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module's folder sits under a folder named `modules`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module naming the parts it is made of is a domain, and heads its own folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a module is let through wherever that module sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That folder sits beside the page the module is a part of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module under a folder beneath that one is under it all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named `.server` is a modules folder too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where a module sits is read from its path rather than from its body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file beside a module page is no module page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page of any other type is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the change takes away is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The parts a module names are read from the body the change leaves.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The index is not read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Alan approved this check in the turn that asked for it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This check judges at every phase.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
