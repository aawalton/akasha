export interface RuleGuidance {
  readonly label: string
  readonly act: (workspace: string) => string
  readonly allowlist: string | null
}

export const ALLOWLIST_FILE =
  "akasha/checks/cluster-checks/modules/check-tsconfig-allowlists/check-tsconfig-allowlists.module.code.ts"

export const RULE_GUIDANCE: Readonly<Record<string, RuleGuidance>> = {
  extends: {
    label: "Missing extends tsconfig.base.json",
    act: (ws) => `set "extends" to the relative path of tsconfig.base.json in ${ws}/tsconfig.json`,
    allowlist: null,
  },
  composite: {
    label: "Missing composite: true",
    act: (ws) => `add "composite": true under compilerOptions in ${ws}/tsconfig.json`,
    allowlist: null,
  },
  emitDeclarationOnly: {
    label: "Missing emitDeclarationOnly: true",
    act: (ws) => `add "emitDeclarationOnly": true under compilerOptions in ${ws}/tsconfig.json`,
    allowlist: null,
  },
  allowImportingTsExtensions: {
    label: "Has allowImportingTsExtensions: true",
    act: (ws) =>
      `remove "allowImportingTsExtensions" from compilerOptions in ${ws}/tsconfig.json and drop the .ts suffix from the imports that needed it`,
    allowlist: "ALLOWED_ALLOW_IMPORTING_TS_EXTENSIONS",
  },
  missingReference: {
    label: "Missing tsconfig reference for workspace import",
    act: (ws) =>
      `add the imported workspace to "references" in ${ws}/tsconfig.json, or drop the import`,
    allowlist: "ALLOWED_MISSING_REFERENCES",
  },
  spuriousReference: {
    label: "Spurious tsconfig reference with no backing source import",
    act: (ws) => `remove the unbacked entry from "references" in ${ws}/tsconfig.json`,
    allowlist: "ALLOWED_SPURIOUS_REFERENCES",
  },
  cycle: {
    label: "Circular import dependency between workspace packages",
    act: () =>
      `break the cycle in SOURCE — remove one direction's imports, or extract what both sides share into a third workspace. Editing a tsconfig does not clear this`,
    allowlist: "ALLOWED_CYCLES",
  },
  noOutDir: {
    label: "Has compilerOptions.outDir without TSTL bundling",
    act: (ws) => `remove "outDir" from compilerOptions in ${ws}/tsconfig.json`,
    allowlist: null,
  },
  sourceLayout: {
    label: "Non-canonical tsconfig include shape",
    act: (ws) =>
      `set "include" in ${ws}/tsconfig.json to ["src/**/*.ts"] or ["src/**/*.ts", "src/**/*.tsx"], moving any source it reached outside src/ into src/`,
    allowlist: "ALLOWED_NON_CANONICAL_INCLUDE",
  },
  excludeShape: {
    label: "Non-canonical tsconfig exclude shape",
    act: (ws) =>
      `set "exclude" in ${ws}/tsconfig.json to ["node_modules", "dist"] followed only by test patterns, or remove the field entirely — excluding nothing is allowed. An entry naming non-test source belongs in the code rather than here: dropping source from the program hides it from every typecheck`,
    allowlist: null,
  },
  nestedContainment: {
    label: "Nested workspace package lives inside a parent workspace's src/ directory",
    act: (ws) =>
      `move ${ws} to sit BESIDE its parent's src/ rather than inside it, and repoint the imports that named the old path`,
    allowlist: null,
  },
}

export function groupHeading(rule: string): string {
  const guidance = RULE_GUIDANCE[rule]
  if (!guidance) return rule
  const exception =
    guidance.allowlist === null
      ? "no approved-exception list for this rule"
      : `approved exceptions: ${guidance.allowlist} in ${ALLOWLIST_FILE}`
  return `${guidance.label} — ${exception}`
}

export function guidedText(rule: string, workspace: string, message: string): string {
  const guidance = RULE_GUIDANCE[rule]
  if (!guidance) return message
  return `${message}\n        fix: ${guidance.act(workspace)}`
}
