function hasDigestPin(image: string): boolean {
  return image.includes("@sha256:")
}

const DYNAMIC_POD_PATTERNS: readonly RegExp[] = [
  /^registry.registry.svc.cluster.local:5000\/cluster\//,
]

function isDynamicPodImage(image: string): boolean {
  return DYNAMIC_POD_PATTERNS.some((p) => p.test(image))
}

function isTemplateVariable(image: string): boolean {
  return /\$\{/.test(image) || /\$[A-Z_]/.test(image)
}

const PINNED_TAG_FORM = /^[A-Za-z]?[0-9]/

const CONVENTION_PATTERNS: readonly RegExp[] = [/^debian:[a-z]+-slim$/]

function extractTag(image: string): string | null {
  if (hasDigestPin(image)) return null

  const colonIdx = image.lastIndexOf(":")
  if (colonIdx === -1) return ""

  const afterColon = image.slice(colonIdx + 1)
  if (afterColon.includes("/")) return ""

  return afterColon
}

export function checkImage(image: string): string | null {
  if (hasDigestPin(image)) return null
  if (isDynamicPodImage(image)) return null
  if (isTemplateVariable(image)) return null
  if (image.includes("MUST_BE_SET")) return null

  for (const pattern of CONVENTION_PATTERNS) {
    if (pattern.test(image)) return null
  }

  const tag = extractTag(image)
  if (tag === null) return null

  if (tag === "") return "no tag specified"

  if (!PINNED_TAG_FORM.test(tag)) return `floating tag :${tag} (names no version)`

  return null
}
