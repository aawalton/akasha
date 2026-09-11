import type { CodeCheck } from "../../code-check.page-type.types.ts"

export const checkReachesAPathThroughTheIndex = {
  id: "01a0824b-5ca1-7150-a799-fd2189f44fe4",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "check-reaches-a-path-through-the-index",
  definition: "the check refusing a page file that spells or lists a path the index answers for",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  experimental: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The files of every page in the tree are judged rather than a check's own code.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a file may be named for are asked of the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A literal is judged by the path that literal reaches rather than by the text that literal spells.",
    },
    {
      invariantKind: "departure",
      statement: "A directory listing is a call naming a reader of a directory.",
    },
    {
      invariantKind: "departure",
      statement: "A call handed `ls-files` lists a directory too.",
    },
    {
      invariantKind: "departure",
      statement: "A page's code spelling a page file's name where that code lists is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name is a page file's where a page type the index knows sits between its dots.",
    },
    {
      invariantKind: "departure",
      statement: "What follows that page type in the name is a run of plain segments.",
    },
    {
      invariantKind: "departure",
      statement: "The index answers a file whose own name closes with that name.",
    },
    {
      invariantKind: "departure",
      statement: "A name the index answers no file for names nothing and is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A name refused already as a path spelled is not refused a second time.",
    },
    {
      invariantKind: "gap",
      statement: "A page's test listing a folder is judged by no name that test spells.",
    },
    {
      invariantKind: "absence",
      statement: "A page type reached through a template rather than a plain string is not seen.",
    },
    {
      invariantKind: "absence",
      statement: "A listing through a mechanism named nowhere here is not seen.",
    },
    {
      invariantKind: "departure",
      statement: "A literal reaching a directory listing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A literal naming a path the index has a page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder above a page is no page.",
    },
    {
      invariantKind: "departure",
      statement: "A literal naming a folder is refused only where a listing reaches that literal.",
    },
    {
      invariantKind: "departure",
      statement: "A literal naming nothing the index answers for is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A literal naming a page is refused once, at the line that literal sits on.",
    },
    {
      invariantKind: "departure",
      statement: "A path is spelled where the index knows a page at that path.",
    },
    {
      invariantKind: "departure",
      statement: "A path is spelled where the index knows a page under that path.",
    },
    {
      invariantKind: "departure",
      statement: "A path is spelled where the index knows a page ending with that path.",
    },
    {
      invariantKind: "departure",
      statement: "A literal ending in a separator names the folder that separator closes.",
    },
    {
      invariantKind: "departure",
      statement: "A name with no separator is no path.",
    },
    {
      invariantKind: "departure",
      statement: "An expression has whatever a name inside that expression carries.",
    },
    {
      invariantKind: "departure",
      statement: "A name carries whatever an initializer of that name has.",
    },
    {
      invariantKind: "departure",
      statement: "Whatever a name carries is worked out again until nothing changes.",
    },
    {
      invariantKind: "departure",
      statement: "A name a loop binds has whatever the source that loop runs over carries.",
    },
    {
      invariantKind: "departure",
      statement: "A name a `for in` loop binds is a key rather than whatever that loop runs over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name carries over the whole file rather than within the scope that name is bound in.",
    },
    {
      invariantKind: "departure",
      statement: "One listing is refused once however many arguments of that listing have a path.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body has is read rather than the specifiers alone.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is left to the checks that judge a specifier.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page file written in TypeScript is judged where that file is the page's code or test.",
    },
    {
      invariantKind: "departure",
      statement: "A page's code is every file of that page whose last section is `code`.",
    },
    {
      invariantKind: "departure",
      statement: "A page's test is every file of that page whose last section is `test`.",
    },
    {
      invariantKind: "departure",
      statement: "A test's fixtures are no reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page file written in another language is judged whatever section names that file.",
    },
    {
      invariantKind: "absence",
      statement: "A file the index names for no page is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "A file held uncommitted is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "A file a page property says a machine writes is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement:
        "A file a page property says a tool resolves the paths in is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body whose language is not parsed is read as the runs of path characters that body holds.",
    },
    {
      invariantKind: "departure",
      statement: "Such a run is read again from each separator in that run.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a path the index has a page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One run is refused once, at the line that run sits on.",
    },
    {
      invariantKind: "absence",
      statement: "A body outside TypeScript holds no listing.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is no text is read as the text a decoder gives.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the line the listing sits on and the path the index answered.",
    },
    {
      invariantKind: "departure",
      statement: "A long literal is shortened where the refusal names that literal.",
    },
    {
      invariantKind: "absence",
      statement: "A path built from anything but plain strings is not seen.",
    },
    {
      invariantKind: "absence",
      statement: "A value a helper returns is not carried to the caller that lists that value.",
    },
    {
      invariantKind: "gap",
      statement: "A path no page of the index sits at is seen by nothing here.",
    },
    {
      invariantKind: "gap",
      statement:
        "A run that only looks like a path is read as one, and refuses where the index answers for that run.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 25 },
} as const satisfies CodeCheck
