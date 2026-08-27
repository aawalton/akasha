---
id: be28d946-997b-5e60-a03c-1e9ca1e4b261
page-type-slug: finding
title: "Twelve inference commands record their runs only as rows, and will report success recording nothing"
domain-slug: domain/inference
---

# Claim

Every generating command in the `inference` namespace records its run as a database row, and
nothing writes that record to a file. When the pages table goes, twelve commands lose the only
account of what they produced, and each will still report success while recording nothing.

# Evidence

`tools/lib/inference-run.ts:3-4` reaches two code-repo modules by path,
`packages/infra/inference/src/inference-run-record.ts` and `inference-run-store.ts`.

`packages/infra/inference/src/inference-run-store.ts:1-3` imports `createPage` and
`patchPageById` from `@shared/pages-access`, `USER_ID` from `@shared/supabase-auth`, and
`createServiceRoleClient` from `@shared/supabase-server`. There is no file-writing path in
the store beside them; `persist-audio` and `persist-image` write the ARTIFACT bytes, not
the run record.

The commands whose summary states "writes an inference-run row", measured 2026-08-19 by
reading each summary line under `tools/commands/inference/`: `edit`, `generate`, `music`,
`segment`, `upscale`, `video-qa`, `voice-clone`, `voice-design`. The `segment` implementation
in `tools/lib/inference-segment.ts:119-132` builds the record and wraps the whole run in
`recordInferenceRun`, so the record brackets the work rather than following it.

This is measured against the corpus's stated direction rather than against a plan: `page-types/seat.md`
and `page-types/persona.md` each state "Everything about a <it> stands in <its> file, and nothing
in a row", and `page-types/pipeline.md`, `workflow.md` and `step.md` each carry "is backed by files"
as intent. `ops project create --help` states outright "There is NO ROW".

NOT MEASURED: whether anything reads an `inference-run` row today. I traced where the record is
written, not who consumes it, so whether the loss costs a reader or only an archive is open.
