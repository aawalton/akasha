import { getPages } from "@akasha/pages/access/get"

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
