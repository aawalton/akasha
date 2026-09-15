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
      invariantKind: "departure",
      statement: "A module's folder sits under a folder named `modules`.",
    },
    {
      invariantKind: "departure",
      statement: "A module naming the parts it is made of is a domain, and heads its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "Such a module is let through wherever that module sits.",
    },
    {
      invariantKind: "departure",
      statement: "That folder sits beside the page the module is a part of.",
    },
    {
      invariantKind: "departure",
      statement: "A module under a folder beneath that one is under it all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `.server` is a modules folder too.",
    },
    {
      invariantKind: "departure",
      statement: "Where a module sits is read from its path rather than from its body.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a module page is no module page.",
    },
    {
      invariantKind: "departure",
      statement: "A page of any other type is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is let through.",
    },
    {
      invariantKind: "departure",
      statement: "The parts a module names are read from the body the change leaves.",
    },
    {
      invariantKind: "absence",
      statement: "The index is not read here.",
    },
    {
      invariantKind: "departure",
      statement: "Alan approved this check in the turn that asked for it.",
    },
    {
      invariantKind: "departure",
      statement: "This check judges at every phase.",
    },
  ],
  check: { maxCpuSeconds: 5 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
