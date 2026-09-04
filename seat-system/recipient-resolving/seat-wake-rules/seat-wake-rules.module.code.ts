export type RuleStatus = "LIVE" | "PROPOSED"

export interface CommsInput {
  readonly sender: string
  readonly content: string
}

export interface CommsRule {
  readonly id: string
  readonly senderMatch: string
  readonly contentRegex: string | undefined
  readonly target: string
  readonly status: RuleStatus
}

export type StateAuthorityKind = "pages-rows" | "bound-worktree" | "game-state-rows"

export interface StateAuthority {
  readonly kind: StateAuthorityKind
  readonly detail: string
}

export type ResumePolicy =
  | { readonly kind: "fresh" }
  | { readonly kind: "resume-under-budget"; readonly tokenThreshold: number }

export interface OnDemandAgentSpec {
  readonly name: string
  readonly wakeSources: readonly CommsRule[]
  readonly stateAuthority: readonly StateAuthority[]
  readonly resumePolicy: ResumePolicy
  readonly owner: string
  readonly bootPrompt?: string
}

export function ruleMatches(rule: CommsRule, input: CommsInput): boolean {
  const senderHit = input.sender.length > 0 && input.sender.includes(rule.senderMatch)
  if (!senderHit) return false
  if (rule.contentRegex === undefined) return true
  try {
    return new RegExp(rule.contentRegex, "i").test(input.content)
  } catch {
    return false
  }
}
