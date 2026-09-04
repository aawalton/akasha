// Whether this pod can actually read a page, asked without a session and answered without any
// page's content.
//
// This is deliberately NOT `/api/health`. That path is the liveness and readiness probe
// (`alanwalton-web.cluster-service.code.attachment.ts:114-127`), so a check that goes red there
// kills the container after six failures and pulls the one replica out of the service. A
// liveness probe answers "is this process alive", and making it answer "is the pages service
// reachable" turns a dependency outage into a crashloop. This route answers the second question
// at its own address, where going red is a report rather than a kill.
//
// It reads `page-type`, which the pages service holds hundreds of. Nought rows is a failure here
// rather than a pass: an empty answer is the shape a broken read makes when it is not raising,
// and reading it as success is the defect this route exists to catch.
import { getPages } from "@akasha/pages-access/get"

export const PROBE_PAGE_TYPE = "page-type"

const WHY_CAP = 300

export type PagesRead = () => Promise<number>

const liveRead: PagesRead = async () => {
  const got = await getPages({ pageTypeSlug: PROBE_PAGE_TYPE, limit: 1 })
  return got.rows.length
}

export async function pagesReady(read: PagesRead = liveRead): Promise<Response> {
  let rows: number
  try {
    rows = await read()
  } catch (thrown) {
    const raised = thrown instanceof Error ? `${thrown.name}: ${thrown.message}` : String(thrown)
    return Response.json(
      { ready: false, read: PROBE_PAGE_TYPE, why: raised.slice(0, WHY_CAP) },
      { status: 503 }
    )
  }
  if (rows < 1) {
    return Response.json(
      {
        ready: false,
        read: PROBE_PAGE_TYPE,
        why: `\`${PROBE_PAGE_TYPE}\` answered no page, and this site holds many, so the read did not reach them`,
      },
      { status: 503 }
    )
  }
  return Response.json({ ready: true, read: PROBE_PAGE_TYPE, rows }, { status: 200 })
}

export function loader(): Promise<Response> {
  return pagesReady()
}
