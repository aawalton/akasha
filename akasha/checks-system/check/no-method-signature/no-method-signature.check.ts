import type { Check } from "../check.page-type.ts"

export const noMethodSignature = {
  id: "01a04bc8-6c64-7482-a9b8-f0d6e14e546d",
  pageTypeSlug: "check",
  slug: "no-method-signature",
  definition: "the check refusing a method signature in an interface or a type literal",
  code: "ts",
  test: "ts",
  needs: "file",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "absence",
      statement:
        "A call, construct or index signature is not a method signature, and is not judged.",
    },
    {
      invariantKind: "absence",
      statement:
        "A method written on a class or an object literal is not a signature, and is not judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property holding a function type says the same thing and is checked both ways round, so the method form is the one refused.",
    },
  ],
} as const satisfies Check
