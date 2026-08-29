import type { Check } from "../check.page-type.ts"

export const noMethodSignature = {
  id: "01a04b6b-ae6a-7336-9c56-6ce1bb9e9e9f",
  pageTypeSlug: "check",
  slug: "no-method-signature",
  definition: "the check refusing a method signature in an interface or a type literal",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-type", "module/checking"],
  design: [
    "A call, construct or index signature is not a method signature, and is not judged.",
    "A method written on a class or an object literal is not a signature, and is not judged.",
    "A property holding a function type says the same thing and is checked both ways round, so the method form is the one refused.",
  ],
} as const satisfies Check
