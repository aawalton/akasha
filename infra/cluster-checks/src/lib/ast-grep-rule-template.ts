export interface AstGrepRuleTemplateArgs {
  readonly id: string
  readonly packageDir: string
  readonly language: string
  readonly repoWide?: boolean
}

export const RULES_DIR = "rules"

export function ruleFilePath(packageDir: string, id: string): string {
  return `${packageDir}/${RULES_DIR}/${id}.yml`
}

export function sgconfigPath(packageDir: string): string {
  return `${packageDir}/sgconfig.yml`
}

export function renderSgconfig(): string {
  return `ruleDirs:\n  - ${RULES_DIR}\n`
}

function globsFor(args: AstGrepRuleTemplateArgs): readonly string[] {
  const root = args.repoWide === true ? "packages" : args.packageDir
  return [`"${root}/**/*.${args.language}"`]
}

export function renderAstGrepRule(args: AstGrepRuleTemplateArgs): string {
  if (args.id === "")
    throw new Error("an ast-grep rule needs an id — it cannot be run or reported on without one")
  if (args.packageDir === "") throw new Error("an ast-grep rule needs an owning package directory")

  const globs = globsFor(args)
    .map((g) => `  - ${g}`)
    .join("\n")

  return `id: ${args.id}
message: |
  REPLACE THIS. State what is wrong and what to do instead — this text is the
  whole remediation an author gets, and a rule whose message only names the
  pattern leaves them to rediscover the reasoning.

  BOUNDS — say here what this rule does NOT cover, so a green from it is not
  read as a guarantee it never made.
severity: error
language: ${args.language}
files:
${globs}
ignores:
  - "**/dist/**"
rule:
  # REPLACE THIS. \`$NAME\` captures one node, \`$$$ARGS\` captures many.
  # Iterate locally from the REPO ROOT — the same walk root CI uses:
  #   ast-grep scan -r ${ruleFilePath(args.packageDir, args.id)}
  pattern: someBannedCall($$$ARGS)
`
}
