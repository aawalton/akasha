import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const fileLength = {
  id: "01a04bcb-c6e7-7e01-9b01-3cad38df56be",
  type: "check-code",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling its kind is held to",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file in the akasha folder is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the audit listed and no longer in the tree refuses the run.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No length is answered for a file the check could not measure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file's length is the length of the body its path opens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link is measured by what that link opens rather than by the link.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every phase answers one length for one path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path opening no body has no length to judge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that will not open refuses the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry file is held to the widest byte ceiling of any file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry file has the `jsonl` or the `json` extension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A markup file is held to a byte ceiling wider than a code file's ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A markup file has the `xml` extension.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The game rather than akasha decides where a markup file may be divided.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prose file is held to a byte ceiling wider than a code file's ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prose file has the `md` or the `txt` extension.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The author rather than akasha decides where prose may be divided.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal for a prose file names the cost dividing prose puts on a reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal for a markup file names the division an addon's manifest admits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal for a test file names the `test-fixtures` file standing beside that test file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property saying its files are not judged for length lets those files off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property naming its file is read from the file's own name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file is let off only where a page with the property sits in its folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file of that name in another folder is held to the ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property naming no file is read from the section its files have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file that section names is let off only under a page type carrying that property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Two properties sharing a section name are told apart by the page type in the name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder property saying its files are not judged for length lets them off too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That folder is read from the name the property states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file beneath that folder is let off only where a page with the property sits above it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file under a folder of that name elsewhere is held to the ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An extension property saying its files are not judged for length lets them off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That extension is read from the name the property states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file closing that way is let off only where a page with the property sits in its folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file closing that way in a folder beneath that page is held to the ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which files a machine writes is a question asked elsewhere.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
