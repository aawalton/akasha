import type { List } from "../list.page-type.ts"

export const formulaOperators = {
  id: "01a044fa-2cd4-7000-9110-d4fab019a37e",
  pageTypeSlug: "list",
  slug: "formula-operators",
  definition: "the operators a formula can use",
  members: [
    { memberName: "`+`", definition: "adds one number to another" },
    {
      memberName: "`-`",
      definition:
        "subtracts one number from another, or negates one where nothing stands to its left",
    },
    { memberName: "`*`", definition: "multiplies one number by another" },
    { memberName: "`/`", definition: "divides one number by another" },
    { memberName: "`==`", definition: "whether two values are the same" },
    { memberName: "`!=`", definition: "whether two values differ" },
    { memberName: "`<`", definition: "whether one number is less than another" },
    { memberName: "`<=`", definition: "whether one number is at most another" },
    { memberName: "`>`", definition: "whether one number is more than another" },
    { memberName: "`>=`", definition: "whether one number is at least another" },
    { memberName: "`&&`", definition: "whether both sides are true" },
    { memberName: "`??`", definition: "the left, or the right where the left is absent" },
  ],
} as const satisfies List
