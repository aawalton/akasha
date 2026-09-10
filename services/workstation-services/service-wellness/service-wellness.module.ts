import type { Module } from "@akasha/code/module"

export const serviceWellness = {
  id: "01a08c77-e4ed-7a27-8a82-acaacd3068bd",
  pageTypeSlug: "module",
  slug: "service-wellness",
  definition: "the verdict the last look at a service's health left",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A verdict is kept beside the page of the service the verdict is about.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict never reaches the commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A verdict is a reading like any other, and no better than the moment it was taken.",
    },
    {
      invariantKind: "departure",
      statement: "The moment a look happened is kept beside what that look found.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict is written on every look, whether or not what the look found changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service no look reached carries no verdict rather than a verdict saying broken.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict replaces the verdict before it.",
    },
    {
      invariantKind: "departure",
      statement: "The two keys a verdict is carried under are named here alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether a service is well.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks systemd anything.",
    },
    {
      invariantKind: "gap",
      statement:
        "Whether a reading is current is read off the wellness of the service that took it.",
    },
  ],
} as const satisfies Module
