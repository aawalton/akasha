import type { Finding } from "../finding.page-type.types.ts"

export const anAnonKeyForSupabaseIsInTheCommit = {
  id: "01a05d1a-87dc-7968-889e-d85c122a224f",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "an-anon-key-for-supabase-is-in-the-commit",
  domain: "page-type/change",
  claim:
    "A workflow template holds a Supabase anon key as a module constant rather than reading it from sops. The key is signed for the self-hosted issuer, carries the anon role, and is good until April 2036. Everyone with a checkout has it, and every checkout taken before it is replaced keeps it.",
  evidence:
    "Alan ruled on 2026-09-08: this waits, and he rotates every key at the end. It is recorded here so nobody escalates it a second time. Rotation is the only thing that closes it, because every clone already taken holds the key and rewriting history does not reach those.\n\nWhere it is now, checked 2026-09-08 by count alone, printing no value. No text file at HEAD holds it: a search of HEAD for the token prefix comes back empty. It left the working tree at 219b3209db, an ancestor of HEAD. It is still reachable at 63ed3c022a~1, also an ancestor of HEAD, so anyone with a clone has it.\n\nThis finding names the wrong path. The key was not at pages/workflow-template/workflow-temper-watcher.workflow-template.declaration.attachment.ts by the time that file went; that path answers zero matches at its own parent commit. The key lived at the older changes/workflow-templates/pages/workflow-temper-watcher/ address.\n\nThe pattern that put it there is gone. An anon key is now a sops-held page secret under service-system/secrets/pages/, as every other secret in the repository already was.\n\nWhat was true when this was written. The payload decodes to role `anon`, issuer `https://supabase.alanwalton.com/auth/v1`, and expiry 2092231506, which is 2036-04-19. Found while surveying which supabase code is not auth code. Service-role and anon values are also in plaintext at alanwalton/web/.env.local, which git does not track, so those remain on the machine holding them and are named here only so the two are not confused.",
} as const satisfies Finding
