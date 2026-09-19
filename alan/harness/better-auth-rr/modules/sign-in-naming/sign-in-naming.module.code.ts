export const GOOGLE = "google"

export const SIGN_IN = "sign-in"

export const CONTRIBUTOR = "contributor"

const BYTES = new TextEncoder()

export async function hashOf(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", BYTES.encode(text))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

export async function subjectHashOf(subject: string): Promise<string> {
  return hashOf(subject)
}

export async function emailHashOf(email: string): Promise<string> {
  return hashOf(email.toLowerCase())
}

export function signInSlugFor(provider: string, subjectHash: string): string {
  return `${provider}-${subjectHash}`
}

export function contributorSlugFor(emailHash: string): string {
  return `${CONTRIBUTOR}-${emailHash}`
}

export function contributorNamedAs(contributorSlug: string): string {
  return `${CONTRIBUTOR}/${contributorSlug}`
}
