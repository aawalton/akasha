import type { Finding } from "../finding.page-type.ts"

export const anAnonKeyForSupabaseIsInTheCommit = {
  id: "01a05d1a-87dc-7968-889e-d85c122a224f",
  pageTypeSlug: "finding",
  slug: "an-anon-key-for-supabase-is-in-the-commit",
  domainSlug: "domain/change",
  claim:
    "A workflow template holds a Supabase anon key as a module constant rather than reading it from sops. The key is signed for the self-hosted issuer, carries the anon role, and is good until April 2036. Everyone with a checkout has it, and every checkout taken before it is replaced keeps it.",
  evidence:
    "The key is at pages/workflow-template/workflow-temper-watcher.workflow-template.declaration.attachment.ts, which git tracks. Its payload decodes to role `anon`, issuer `https://supabase.alanwalton.com/auth/v1`, and expiry 2092231506, which is 2036-04-19. Every other secret in the repository is sops-encrypted. Found while surveying which supabase code is not auth code. Service-role and anon values are also in plaintext at alanwalton/web/.env.local, which git does not track, so those remain on the machine holding them and are named here only so the two are not confused.",
} as const satisfies Finding
