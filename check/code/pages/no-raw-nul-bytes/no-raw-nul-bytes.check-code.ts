import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noRawNulBytes = {
  id: "01a04bc8-6c71-7973-85d5-6d17ea5fea65",
  type: "page-type/check-code",
  slug: "no-raw-nul-bytes",
  definition: "the check refusing a file with a raw NUL byte",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file no property declares as bytes is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body a file property declares as bytes is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming its file is read from the file's own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That file is let through only where a page with the property sits in its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file of that name in another folder is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming no file is read from the section its files have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file that section names is let through only under a page type carrying that property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two properties sharing a section name are told apart by the page type in the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body a folder property declares as bytes is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder is read from the name the property states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file beneath that folder is let through only where a page with the property sits above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file under a folder of that name elsewhere is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body an extension property declares as bytes is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That extension is read from the name the property states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file closing that way is let through only where a page with the property sits in its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file closing that way in a folder beneath that page is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with more than one NUL is reported at the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report says how many NULs the file carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A NUL is counted in the bytes rather than in the decoded text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a property declares as bytes is never opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The audit reads every file into one room it keeps, read once at the size the file states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with no NUL is let through before any line is counted.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
  createdAt: "2026-08-29T04:30:21.297Z",
  updatedAt: "2026-10-23T21:45:15.244Z",
} as const satisfies CheckCode
