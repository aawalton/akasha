export type SecretEnv = {
  name: string
  valueFrom: { secretKeyRef: { name: string; key: string } }
}

export function secretEnv(name: string, secretName: string, key: string): SecretEnv {
  return { name, valueFrom: { secretKeyRef: { name: secretName, key } } }
}
