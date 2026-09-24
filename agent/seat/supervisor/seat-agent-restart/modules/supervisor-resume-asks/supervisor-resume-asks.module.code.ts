import { noticeNamed } from "akasha/agent/message/notice/modules/compose-notices/compose-notices.module.code.ts"
import { restartDeferred } from "akasha/agent/message/notice/pages/restart-deferred/restart-deferred.agent-message-notice.ts"
import { restartImmediate } from "akasha/agent/message/notice/pages/restart-immediate/restart-immediate.agent-message-notice.ts"
import { restartRecoveryClause } from "akasha/agent/message/notice/pages/restart-recovery-clause/restart-recovery-clause.agent-message-notice.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  planRestartNotice,
  type RestartNoticeContext,
  type RestartNoticeRoute,
  type RestartNowEvent,
} from "akasha/agent/seat/supervisor/seat-agent-restart/modules/agent-restart-notice-decide/agent-restart-notice-decide.module.code.ts"

const SUPERVISOR_NOTICE_PREFIX = "[supervisor]"

export type RestartNoticePlan = { readonly route: RestartNoticeRoute; readonly notice: string }

const UNCOMPOSED_PREFIX = `${SUPERVISOR_NOTICE_PREFIX} Your resume notice could not be composed`

const REASON_CAP = 400

function uncomposedRestart(reason: string): RestartNoticePlan {
  console.error(`${LOG} ${reason}`)
  return {
    route: "spawn-argv",
    notice: `${UNCOMPOSED_PREFIX}: ${reason.slice(0, REASON_CAP)}. Nothing was asked of you by this restart.`,
  }
}

export function restartNoticePlan(question: {
  readonly event: RestartNowEvent
  readonly ctx: RestartNoticeContext
}): RestartNoticePlan {
  try {
    const plan = planRestartNotice(question.event, question.ctx, {
      [restartImmediate.slug]: noticeNamed(restartImmediate.slug),
      [restartDeferred.slug]: noticeNamed(restartDeferred.slug),
      [restartRecoveryClause.slug]: noticeNamed(restartRecoveryClause.slug),
    })
    if (plan.notice === "") return uncomposedRestart("the restart notice composed to nothing")
    return plan
  } catch (error) {
    return uncomposedRestart(`the restart notice could not be composed: ${String(error)}`)
  }
}
