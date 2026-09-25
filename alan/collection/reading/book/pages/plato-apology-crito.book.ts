import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const platoApologyCrito = {
  id: "01a0659d-311d-7005-a5cf-719dac3d69e0",
  type: "page-type/book",
  slug: "plato-apology-crito",
  title: "Plato: Apology, Crito",
  description:
    "Plato's Apology and Crito, in Benjamin Jowett's translation — Socrates' defense before the Athenian court, and his refusal to escape his sentence.",
  unit: "unit/words",
} as const satisfies Book
