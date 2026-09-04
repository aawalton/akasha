import type { Finding } from "../finding.page-type.ts"

export const twoLanesWereBriefedForCalendarSync = {
  id: "01a05c18-585b-7b58-b483-1d51f18d8e4b",
  pageTypeSlug: "finding",
  slug: "two-lanes-were-briefed-for-calendar-sync",
  domainSlug: "domain/alan-harness",
  claim:
    "Two lanes were briefed to move `alanwalton/calendar-sync` on the same night. I surveyed it, found nothing blocking, and handed it whole to the lane whose brief named only it and `elaine-cli`, rather than land it and collide. The call I took: the lane with the narrower brief keeps the folder, and my lane reports the survey without writing a file. `alan-harness` says to hand work on rather than halve it.",
  evidence:
    "My survey at HEAD: 15 tracked files, 9 TypeScript files under `src/`, no tests, zero relative paths reaching out of `src/`, an empty `exports` object, and one inbound reach by package name at `pages/workflow-template/workflow-alanwalton-calendar-sync.workflow-template.declaration.attachment.ts` line 8. Nothing about the code blocked a move; the size was small.\n\nWhat is entangled is the deploy path. The string `alanwalton/calendar-sync` stands as a working directory in four places: the CronJob `command` in the package's own `.cluster-service.code.attachment.ts`, `runtime_cmd` in its `deploy/dockerfile-extensions.json`, `infra/scripts/src/generate-dockerfiles-registry.ts` line 15, and the workflow template attachment at lines 16 and 36.\n\nThe other lane corrected me here and its reading is the better one. `akasha/service-system/cluster-service/properties/manifest-code.text-property.ts` carries the stopgap invariant that the file a cluster service names stands outside akasha, so the cluster-service page, its attachment, `deploy/` and `generated/` all stay where they are and only `package.json`, `tsconfig.json` and `src/` move. That leaves the dockerfiles registry and the workflow template untouched, and shrinks the change to the two run paths.\n\nA gap stands either way. `akasha/service-system/cluster-service/cluster-services/` holds six pages and every one is a Deployment. calendar-sync is a CronJob, and the cluster-service page type requires `replicas` and `container-port`, neither of which a CronJob has. That gap is being filed separately by the lane that owns the folder.",
} as const satisfies Finding
