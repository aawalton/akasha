import type { Book } from "../../book.page-type.ts"

export const platoApologyCrito = {
  id: "01a0659d-311d-7005-a5cf-719dac3d69e0",
  pageTypeSlug: "book",
  slug: "plato-apology-crito",
  title: "Plato: Apology, Crito",
  kind: "read",
  description:
    "Plato's Apology and Crito, in Benjamin Jowett's translation — Socrates' defense before the Athenian court, and his refusal to escape his sentence.",
  unitSlug: "words",
} as const satisfies Book
