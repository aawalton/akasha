import type { Finding } from "../finding.page-type.ts"

export const anUploadToTestflightIsADeliveryToAPhone = {
  id: "01a060cc-1999-7000-b3d7-8a03e8260a7c",
  pageTypeSlug: "finding",
  slug: "an-upload-to-testflight-is-a-delivery-to-a-phone",
  domainSlug: "workspace-package/mobile-cli",
  claim:
    "Uploading a build to TestFlight delivers it to a tester's phone with no further act. Each of the three apps has one beta group, internal, with `hasAccessToAllBuilds` true, and every build reads `autoNotifyEnabled` true, so App Store Connect distributes and notifies on its own once processing ends. `deploy-testflight` only ever GETs from App Store Connect, so it neither distributes nor can decline to. Its one lever is `--no-upload`.",
  evidence:
    "Read live from the App Store Connect API on 2026-09-02, with the key the deploy itself uses.\n\nEach app has exactly one beta group, internal, with `hasAccessToAllBuilds: true`: `com.alanwalton.app` (6785480749) `Alan Walton`, 1 tester `INSTALLED`; `me.smilingjenny.app` (6798916284) `Internal`, 2 testers, both `INSTALLED`; `com.alanwalton.atlas` (6786008288) `Internal`, 1 tester `INSTALLED`.\n\nEvery build read carries `autoNotifyEnabled: true` and `internalBuildState: IN_BETA_TESTING` in its `buildBetaDetail`, and appears in its group's own build list: alanwalton 197-199, smilingjenny 18/20/21, atlas 1. Build 199, uploaded 2026-09-01T18:23:05-07:00, reached that state with nothing acting on it afterwards.\n\nNothing here distributes. `akasha/mobile-cli/asc-client/asc-client.module.code.ts:187` is the package's only call to App Store Connect, `fetch(url, { headers })` with no method, so every read of it is a GET, and the package holds no POST or PATCH against it anywhere. `akasha/mobile-cli/testflight-deploy-script/testflight-deploy-script.module.code.ts:112-118` ends the remote script at `buildUploadApp`, a build-number reservation and a lock release. `akasha/mobile-cli/altool/altool.module.code.ts:152-158` is `xcrun altool --upload-app` with nothing after it. `tools/lib/mobile-testflight-cut.ts:219-301` files a fingerprint and, under `--wait`, polls.\n\nSo the notifying is Apple's, switched on in App Store Connect, and no flag of this command reaches it. Neither Jenny's app nor Atlas was uploaded tonight for that reason.",
} as const satisfies Finding
