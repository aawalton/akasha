import type { Finding } from "../finding.page-type.ts"

export const temperWebComponentsAreLandingAtTwoDifferentDepths = {
  id: "01a06428-7ccb-7b6c-ae29-024698992ecb",
  pageTypeSlug: "finding",
  slug: "temper-web-components-are-landing-at-two-different-depths",
  domainSlug: "domain/temper",
  claim:
    "The seats carrying temper's web components into akasha are landing them at two depths. The completion group landed under `temper-web/components/completion`, keeping the level the source folder has, and the companion groups are landing under `temper-web/<group>` with that level dropped. Both work, because a part slug names a module by its slug wherever the folder sits, so nothing refuses either and the difference is invisible to every check.",
  evidence:
    "`temper-web/react-router.config.ts` says `appDirectory: \".\"`, so `app/components/X` in the source answers to `components/X` here, which is what the completion group followed on instruction. The companion seat's own staging folder holds paths like `akasha/temper/temper-web/companions/companion-panel/companion-panel.module.code.tsx` and `akasha/temper/temper-web/companion-skills/...`, with no `components` level.\n\n`temper-web.router-app.ts` names every one of them the same way whatever the depth: the list is flat `module/<slug>` entries, sorted, and it held 84 of them when the 60 completion slugs were merged in, for 144. Nothing in the part slug says where the folder is.\n\nThe two depths were seen because the scratchpad folder is shared between the seats rather than private to one: a staging directory written by this seat already held about 88 files another seat had put there, under those paths. That sharing is worth knowing on its own, since a seat clearing its own staging area would take another seat's unlanded work with it.",
} as const satisfies Finding
