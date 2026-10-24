import { alanScheme } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { AlanSettingsPageContent } from "akasha/alan/web/modules/alan-settings-page-content/alan-settings-page-content.module.code.tsx"
import {
  isScheme,
  schemeIn,
} from "akasha/design/interface/system/modules/scheme-choice/scheme-choice.module.code.ts"
import { patchFilePages } from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import { useRouteLoaderData } from "react-router"

const PERSON = "person"

export function meta() {
  return [{ title: "Settings" }]
}

export async function action({ request }: { request: Request }) {
  const schemed = await alanScheme(request)
  if (schemed === null) return { saved: false }
  const chosen = (await request.formData()).get("scheme")
  if (!isScheme(chosen)) return { saved: false }
  await patchFilePages({
    pageTypeSlug: PERSON,
    where: [{ key: "slug", eq: schemed.personSlug }],
    set: { scheme: chosen },
    atMostOne: true,
  })
  return { saved: true }
}

function schemeOfRoot(rooted: unknown) {
  if (typeof rooted !== "object" || rooted === null || !("scheme" in rooted)) return schemeIn(null)
  return schemeIn(rooted.scheme)
}

export default function SettingsRoute() {
  const rooted: unknown = useRouteLoaderData("root")
  return <AlanSettingsPageContent scheme={schemeOfRoot(rooted)} />
}
