import { AlanSettingsPageContent } from "akasha/alan/web/modules/alan-settings-page-content/alan-settings-page-content.module.code.tsx"

export function meta() {
  return [{ title: "Settings" }]
}

export default function SettingsRoute() {
  return <AlanSettingsPageContent />
}
