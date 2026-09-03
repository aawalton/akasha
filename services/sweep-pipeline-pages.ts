// The systemd unit `sweep-pipeline-pages.service` names this path in its ExecStart, and units
// are written by `akasha service install` from the workstation-service page. That page already
// names the akasha module below, and the unit on disk still names this path, so until an install
// runs this path has to keep answering. It stands as a shim over the module that supersedes it
// rather than as a second copy of the body, as `tools/service-wrapper.ts` does for the same
// reason. Removing this file again before the unit is rewritten stops the sweep.
import { sweepingPipelinePages } from "../akasha/changes/pipelines/pipeline-page-sweeping/pipeline-page-sweeping.module.code.ts"

await sweepingPipelinePages()
