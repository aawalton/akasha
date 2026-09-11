import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const besideTurning = {
  id: "01a079a7-c9d9-7936-a9d3-e002d3f8e708",
  type: "module",
  slug: "beside-turning",
  definition: "the pages a change files again though the change has none of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type is turned where the files that page type has beside its pages differ.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is turned where a page type that page type extends is turned.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration gaining or losing a default turns the page type declaring that property.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of a turned page type are read off the index rather than off the disk.",
    },
    {
      invariantKind: "absence",
      statement: "A file that is no page is not answered here though its body loads as a value.",
    },
    {
      invariantKind: "departure",
      statement: "Every page the index names is answered where a property's unique kind turns.",
    },
    {
      invariantKind: "departure",
      statement: "No page is answered for a unique kind where no unique kind turns.",
    },
    {
      invariantKind: "departure",
      statement: "A page type whose slug the change leaves naming no page type strands its pages.",
    },
    {
      invariantKind: "departure",
      statement: "A stranded page is answered so the change withdraws what that page was filed by.",
    },
    {
      invariantKind: "departure",
      statement: "A property is turned for relations where that property's key or target differs.",
    },
    {
      invariantKind: "departure",
      statement: "A property a change adds or takes away is turned for relations.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page types declare a property is read from the declarations rather than from an edge.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type is answered for a property every page type above that page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "The declarers are read from the world before the change and the world after it.",
    },
    {
      invariantKind: "absence",
      statement: "A page the change has is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here files an entry.",
    },
    {
      invariantKind: "departure",
      statement: "An id left under no name is read from the identity lines a change takes away.",
    },
    {
      invariantKind: "departure",
      statement: "The pages naming an id are read from the relation index rather than from a walk.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming an id is read off the index rather than off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A page a file the change carries sits beside is answered.",
    },
    {
      invariantKind: "departure",
      statement: "The page a file sits beside is the page that file's name spells, in its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page is read as a TypeScript file.",
    },
    {
      invariantKind: "absence",
      statement: "A name spelling no section past a page's own name sits beside no page.",
    },
    {
      invariantKind: "departure",
      statement: "A page two files the change carries sit beside is answered once.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index holds no value for is passed over.",
    },
  ],
} as const satisfies Module
