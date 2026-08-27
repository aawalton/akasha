---
id: 47eaf548-57bf-5e51-b125-9ffb0bc0e482
page-type-slug: finding
title: "Traces client alias admits service role"
domain-slug: domain/alanwalton-app
---

# Claim

`@alanwalton/location-traces-access` requires an RLS-scoped client and cannot express it. `LocationTracesAccessClient` is a bare alias for `SupabaseClient<Database>`, so a service-role client satisfies the parameter exactly as a session-scoped one does. The table grants `service_role` everything and takes `user_id` from the caller's own record, so the wrong client writes under any identity and succeeds — the policy that would catch it is what `service_role` never reaches.

# Evidence

Read in `~/code` on `main` at `ecf5f9518f769757f3c2d53227a449b79203a887`.

`packages/alanwalton/location-traces/access/src/client.ts` is three lines and the alias is the whole of it:

    export type LocationTracesAccessClient = SupabaseClient<Database>

`insert.ts` takes that type as its first parameter and states the requirement in prose the compiler does not read: "Written with an RLS-scoped client so `auth.uid()` gates the insert to the caller's own rows." `types.ts` puts `userId` in the record the caller builds, under the comment "must equal `auth.uid()` for the RLS-scoped client", so the identity written is supplied rather than derived.

`packages/shared/supabase/database/schema/public/tables/location_traces.sql` closes the loop. RLS is enabled and all four policies are `TO authenticated` with `user_id = (auth.uid())::text`, the insert one as `WITH CHECK`. Below them:

    GRANT ALL ON TABLE public.location_traces TO service_role;

So a service-role connection sits outside every policy holding full DML. A caller passing one gets no error; they get a successful write under whatever `user_id` their record carried.

Nothing stands between the two. Not the type, not `insert.ts`, and `check-no-raw-location-traces-sql` scans string literals for raw SQL without looking at which client a sanctioned call was handed.

The one live caller is correct, which is why this has cost nothing yet. `packages/alanwalton/atlas/web/app/routes/api.locations.ingest.ts` passes `ctx.supabase`, an RLS-scoped client built from a Bearer JWT or a session cookie. That is a property of the single call site rather than of the boundary, and the next caller inherits none of it.

Found ingesting `dirty/questions/quarantined-prescriptions-access-boundaries.md`, whose entry on this hazard argued over where a prescription against it should rank. The prescription's originals and heirs are all removed; the hole in the type is not.
