export const DECLARATION_RELATIVE_PATH = "tools/lib/skill-token-guard.ts"

const RETIRED_SKILL_REPLACEMENTS: Readonly<Record<string, string>> = {
  p: "/manage (parent project) or /deliver (child project)",
  "amy-calendar": "read Calendar Management",
  domain: "/lead",
  images: "run ops inference generate --help",
}

export const SKILL_TOKEN_GUARD_DECISIONS = ["allow", "reject"] as const

export type SkillTokenGuardDecisionKind = (typeof SKILL_TOKEN_GUARD_DECISIONS)[number]

export type SkillTokenGuardDecision =
  | { readonly kind: "allow" }
  | { readonly kind: "reject"; readonly reason: string }

export function leadingSkillSlug(prompt: string): string | null {
  const trimmed = prompt.trimStart()
  if (!trimmed.startsWith("/")) return null
  const token = trimmed.slice(1).split(/\s/)[0] ?? ""
  return /^[a-z0-9][a-z0-9-]*$/.test(token) ? token : null
}

export function decideSkillTokenGuard(prompt: string): SkillTokenGuardDecision {
  const slug = leadingSkillSlug(prompt)
  if (slug === null) return { kind: "allow" }

  const replacement = RETIRED_SKILL_REPLACEMENTS[slug]
  const reason =
    replacement !== undefined
      ? `prompt invokes retired skill '/${slug}', which no longer exists — the worker would boot to ` +
        `'Unknown command: /${slug}', drop its prompt, and husk. Spawn with --prompt "${replacement}" instead.`
      : `prompt invokes '/${slug}', and this system loads no skills, so the worker would boot to ` +
        `'Unknown command: /${slug}', drop its prompt, and husk. Pass a non-slash prompt. Claude ` +
        `Code's own built-ins are refused here too.`
  return { kind: "reject", reason }
}
