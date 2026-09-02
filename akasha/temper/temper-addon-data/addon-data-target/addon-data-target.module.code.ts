export type AddonDataTarget = {
  readonly rendered: string
  readonly workspacePackage: string
  readonly moduleSlug: string
  readonly partPrefix: string
  readonly parts: number
}

export const ADDON_DATA_TARGETS: readonly AddonDataTarget[] = [
  {
    rendered: "temper-skill.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "character-skills-from-pages",
    partPrefix: "character-skills",
    parts: 85,
  },
  {
    rendered: "temper-scribed-skill.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "scribed-skills",
    partPrefix: "scribed-skills",
    parts: 5,
  },
  {
    rendered: "temper-grimoire.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "scribing-grimoires",
    partPrefix: "scribing-grimoires",
    parts: 4,
  },
  {
    rendered: "temper-character-skill-activation.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "character-skill-activations",
    partPrefix: "character-skill-activations",
    parts: 1,
  },
]

export function targetOf(rendered: string): AddonDataTarget | undefined {
  return ADDON_DATA_TARGETS.find((one) => one.rendered === rendered)
}

export function partSlugsOf(target: AddonDataTarget): readonly string[] {
  if (target.parts === 1) return [target.moduleSlug]
  const held: string[] = []
  for (let at = 0; at < target.parts; at += 1) {
    held.push(`${target.partPrefix}-${String(at).padStart(2, "0")}`)
  }
  return held
}
