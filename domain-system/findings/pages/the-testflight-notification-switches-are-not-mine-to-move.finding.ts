import type { Finding } from "../finding.page-type.ts"

export const theTestflightNotificationSwitchesAreNotMineToMove = {
  id: "01a060fa-3357-7e67-9220-9a49e261608c",
  pageTypeSlug: "finding",
  slug: "the-testflight-notification-switches-are-not-mine-to-move",
  domainSlug: "domain/alan-harness",
  claim:
    "Two App Store Connect switches hold Jenny's build 22 and Atlas build 2: `hasAccessToAllBuilds` on each app's one internal group, and `autoNotifyEnabled` on every build. Turning either off would let both upload tonight without reaching a phone. I did not turn them off: they are configuration Alan set on his own account, and one is set on a group holding Jenny's two devices, which she authorized nothing about.",
  evidence:
    "The call was taken in Alan's absence on 2026-09-02, under the initiative migrate-alan-and-jenny-to-akasha, whose constraint reads that nothing waits on him.\n\nThree roads were open. Upload and reach a tester's phone at night: refused, because Alan asked that nothing be pushed to his and Jenny agreed to nothing. Turn the switches off, upload, turn them back on: refused, for the reason above. Build and validate without uploading: taken. All three apps were archived, exported, stamped and passed `altool --validate-app` — atlas build 2 and smilingjenny build 22 at `fab18f3b081c`, alanwalton build 200 at `5c473f51d4f1`. Apple's latest builds afterwards were still 199, 21 and 1, and no build number was spent.\n\nThe domain `alan-harness` carries the directive His Call: enforce the limits Alan set, never veto a choice he made inside them. Automatic distribution being on is such a choice, and turning it off is a veto worn as care. And `me.smilingjenny.app`'s group holds two devices that are Jenny's; what reaches them is not Alan's to delegate nor mine to take.\n\nWhat this costs is one night. The binaries are signed and Apple-validated, so the upload is one command whenever Alan says the notification is fine or moves the switches himself. What it does not cost is the intent: `akasha deploy` reaching all three apps needs no upload at all.\n\nThe reading behind it is filed at an-upload-to-testflight-is-a-delivery-to-a-phone.",
} as const satisfies Finding
