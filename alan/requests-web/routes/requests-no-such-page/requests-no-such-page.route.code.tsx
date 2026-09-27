import { noSuchPage } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/error-screen/web-phrase-error-screen.module.code.tsx"

export function loader(): never {
  return noSuchPage()
}

export default function RequestsNoSuchPage() {
  return null
}
