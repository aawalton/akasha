const MAX_VALUE_IN_ERROR = 50

function truncate(s: string): string {
  return s.length <= MAX_VALUE_IN_ERROR ? s : `${s.slice(0, MAX_VALUE_IN_ERROR)}…`
}

export type CommitSha40 = string & { readonly __brand: "CommitSha40" }

const COMMIT_SHA_40_RE = /^[0-9a-f]{40}$/

export function commitSha40(s: string): CommitSha40 {
  if (!COMMIT_SHA_40_RE.test(s)) {
    throw new Error(`Invalid CommitSha40: expected 40 lowercase hex chars, got "${truncate(s)}"`)
  }
  return s as CommitSha40
}

export type ShortSha7 = string & { readonly __brand: "ShortSha7" }

const SHORT_SHA_7_RE = /^[0-9a-f]{7}$/

export function shortSha7(s: string): ShortSha7 {
  if (!SHORT_SHA_7_RE.test(s)) {
    throw new Error(`Invalid ShortSha7: expected 7 lowercase hex chars, got "${truncate(s)}"`)
  }
  return s as ShortSha7
}

export function toShortSha7(full: CommitSha40): ShortSha7 {
  return full.slice(0, 7) as ShortSha7
}

export type TreeSha40 = string & { readonly __brand: "TreeSha40" }

const TREE_SHA_40_RE = /^[0-9a-f]{40}$/

export function treeSha40(s: string): TreeSha40 {
  if (!TREE_SHA_40_RE.test(s)) {
    throw new Error(`Invalid TreeSha40: expected 40 lowercase hex chars, got "${truncate(s)}"`)
  }
  return s as TreeSha40
}

export type InputsHash12 = string & { readonly __brand: "InputsHash12" }

const INPUTS_HASH_12_RE = /^[0-9a-f]{12}$/

export function inputsHash12(s: string): InputsHash12 {
  if (!INPUTS_HASH_12_RE.test(s)) {
    throw new Error(`Invalid InputsHash12: expected 12 lowercase hex chars, got "${truncate(s)}"`)
  }
  return s as InputsHash12
}

export type ImageTag = string & { readonly __brand: "ImageTag" }

const IMAGE_TAG_RE = /^[a-zA-Z0-9._:/-]+:[a-zA-Z0-9._-]+$/

export function imageTag(s: string): ImageTag {
  if (!IMAGE_TAG_RE.test(s)) {
    throw new Error(
      `Invalid ImageTag: expected "[host[:port]/]path:tag" with safe chars, got "${truncate(s)}"`
    )
  }
  return s as ImageTag
}
