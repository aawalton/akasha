import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noCredentialInScriptText = {
  id: "01a05031-fa74-7d24-87db-885dfcb18a31",
  pageTypeSlug: "syntax-rule",
  slug: "no-credential-in-script-text",
  definition: "the rule refusing a credential named in script text handed to a browser to run",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A first argument that is no function is script text.",
    },
    {
      invariantKind: "departure",
      statement:
        "The function form stands, its arguments being bound and sent apart from the text rather than written into it.",
    },
    {
      invariantKind: "departure",
      statement:
        "`evaluate`, `evaluateHandle` and `waitForFunction` are read alike, each handing text to the browser to run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a credential would carry is refused wherever it stands inside the text, a property's name reading as any name does.",
    },
    {
      invariantKind: "departure",
      statement:
        "A quoted word spelling `password` is no credential, the rule reading the names code binds and never the words inside a string.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every file is judged, no folder here being the harness and a credential leaking from wherever it is written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test file is judged as any other, a credential in a failing test's trace being leaked as surely as one in a run.",
    },
    {
      invariantKind: "departure",
      statement: "A name is judged rather than what it holds.",
    },
    {
      invariantKind: "gap",
      statement:
        "A credential a function form closes over is not seen, the value never reaching the page and the call failing there instead.",
    },
    {
      invariantKind: "stopgap",
      statement: "No file in reach hands text to a browser to run.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The harness it guards stands outside the akasha folder and arrives when it moves inside.",
    },
  ],
} as const satisfies SyntaxRule
