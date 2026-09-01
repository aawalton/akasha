import type { Finding } from "../finding.page-type.ts"

export const theSupabaseTypesHaveNoGenerator = {
  id: "01a05ae9-3820-7984-a9da-e799b7885d4b",
  pageTypeSlug: "finding",
  slug: "the-supabase-types-have-no-generator",
  domainSlug: "domain/akasha-migration",
  claim:
    "The Supabase database types under `shared/supabase-database/src/generated/` are generated output that nothing in this repository generates. No command, script or workflow emits them, so a schema change in Supabase cannot be carried into the types by running anything, and the file is edited by hand or not at all. Whoever moves this package into akasha inherits a file named generated that no generator stands behind.",
  evidence:
    "The file arrived whole in `0e69821019`, the commit that moved every package into akasha, and was not modified again until it was split tonight. A search over all 291 package manifests, the whole `ops` CLI, `tools/lib/check-workflow/check-configs-codegen.ts` which is this repository's register of generator against output, `pages/`, the shell scripts and the workflows found no producer. The only trace of one anywhere in history is `dotfiles/provision-workstation.sh:98`, which warns that `gen-types` wants a container runtime; no such command stands here.\n\nIt was split by hand into `shared/supabase-database/src/generated/database/` along Supabase's own sections, because at 36085 bytes it was over the ceiling akasha holds a file to. `Functions` was 19322 bytes on its own and is cut again at whole entries and put back together by an interface extending both halves. `Json` moved to its own module because the table and function shards use it and importing it back through the barrel would close a circle. The split was proved identical rather than merely compatible: an exact-identity check compiles for `Database`, `Json`, `public` and each of the five sections.\n\nThe procedure for re-splitting stands in the barrel's header, which is where the next person to regenerate the file will meet it. That is a note rather than a generator, and it holds only until someone regenerates the file from Supabase and pastes it back whole.\n\nThe call I took: split it by hand and say so in the file, rather than build a generator for a schema I cannot reach tonight. Writing one would mean guessing at the Supabase project the types came from.",
} as const satisfies Finding
