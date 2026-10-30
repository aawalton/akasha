import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const clearings = {
  id: "01a09c42-2954-7ac4-b9bf-76a533d55823",
  type: "page-type/file-property",
  slug: "clearings",
  propertySlug: "clearings",
  definition: "the times a hook removes the list of files read by an agent",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line has one clearing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line names the agent cleared, or says none was named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is appended rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-13T19:32:56.788Z",
  updatedAt: "2026-10-30T16:45:21.786Z",
} as const satisfies FileProperty
