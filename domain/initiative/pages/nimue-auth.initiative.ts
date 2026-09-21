import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueAuth = {
  id: "01a0b79c-3c98-78fe-97c4-784d7dc13174",
  type: "page-type/initiative",
  slug: "nimue-auth",
  domain: "domain/auth",
  persona: "persona/nimue",
  intentStack: [
    { statement: "Every site Alan runs signs a person in the way alanwalton.com does." },
    { statement: "No GoTrue issues a token for anything Alan runs." },
    { statement: "Nothing Alan runs keeps anything in Postgres." },
    {
      statement: "A contributor signs in with a passkey.",
      workingMemory:
        "A passkey needs its credential kept, so the stateless cookie does not survive it: the plugin wants `user` and `session` models too, and any adapter turns off the JWE refresh. The way out is taking the ceremony alone and issuing our own cookie. Each site is its own relying party, avoiding Related Origin Requests. With no database it falls back to memory and loses every credential. The app is alanwalton.com in a webview, so a passkey there wants an Associated Domains entitlement and an AASA file.",
    },
    {
      statement: "A person signing in to a product sees that product's own name.",
      workingMemory:
        "Branding in Google Cloud belongs to the project rather than to the client, so one project across every site shows one name on every consent screen. A product named on its own needs a project of its own, with its own client, its own secrets and its own consent screen. One project serves all of them until then.",
    },
    {
      statement: "No Postgres and nothing serving it runs on the cluster.",
      workingMemory:
        "The services to take away are gotrue, postgrest, pgbouncer, pgbouncer-exporter, postgres-cnpg, postgres-exporter, postgres-annual-dump, supabase-realtime and supabase-studio, with the seaweedfs-backup-cnpg job and the two postgres container recipes. The auth-proxy routes `supabase.alanwalton.com` to studio, postgrest, gotrue and realtime, and gates studio on a GoTrue token, so that host goes with them. Each web manifest still carries `NEXT_PUBLIC_ELECTRIC_URL`, which no code reads.",
    },
  ],
} as const satisfies Initiative
