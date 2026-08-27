import { registerTunnelConfigRecipeTypes } from "../../../../tools/lib/graph/producers/tunnel-config-recipe/register.ts"
import { tunnelConfigRecipeEdgeProducer } from "../../../../tools/lib/graph/producers/tunnel-config-recipe/tunnel-config-recipe.edge.producer.ts"
import { tunnelConfigRecipeNodeProducer } from "../../../../tools/lib/graph/producers/tunnel-config-recipe/tunnel-config-recipe.node.producer.ts"
import type { Engine } from "../../../../tools/lib/graph/types.ts"
import { dockerfileRecipeEdgeProducer } from "../../../../tools/lib/graph/producers/dockerfile-recipe/dockerfile-recipe.edge.producer"
import { dockerfileRecipeNodeProducer } from "../../../../tools/lib/graph/producers/dockerfile-recipe/dockerfile-recipe.node.producer"
import { registerDockerfileRecipeTypes } from "../../../../tools/lib/graph/producers/dockerfile-recipe/register"
import { fileNodeProducer } from "../../../../tools/lib/graph/producers/file/file.node.producer"
import { registerFileNodeTypes } from "../../../../tools/lib/graph/producers/file/register"
import { tsFileEdgeProducer } from "../../../../tools/lib/graph/producers/file/ts-file/ts-file.edge.producer"
import { k8sSynthEdgeProducer } from "../../../../tools/lib/graph/producers/k8s/k8s-synth.edge.producer"
import { k8sSynthNodeProducer } from "../../../../tools/lib/graph/producers/k8s/k8s-synth.node.producer"
import { k8sEdgeProducer } from "../../../../tools/lib/graph/producers/k8s/k8s.edge.producer"
import { k8sNodeProducer } from "../../../../tools/lib/graph/producers/k8s/k8s.node.producer"
import { rbacEdgeProducer } from "../../../../tools/lib/graph/producers/k8s/rbac.edge.producer"
import { registerK8sNodeTypes, registerK8sSynthEdgeTypes } from "../../../../tools/lib/graph/producers/k8s/register"
import { packageContainsFileEdgeProducer } from "../../../../tools/lib/graph/producers/package/package-contains-file.edge.producer"
import { packageEdgeProducer } from "../../../../tools/lib/graph/producers/package/package.edge.producer"
import { packageNodeProducer } from "../../../../tools/lib/graph/producers/package/package.node.producer"
import { registerPackageTypes } from "../../../../tools/lib/graph/producers/package/register"
import { pipelineEdgeProducer } from "../../../../tools/lib/graph/producers/pipeline/pipeline.edge.producer"
import { pipelineNodeProducer } from "../../../../tools/lib/graph/producers/pipeline/pipeline.node.producer"
import { registerPipelineTypes } from "../../../../tools/lib/graph/producers/pipeline/register"

export const registerWatchProducers = (engine: Engine): undefined => {
  registerPackageTypes(engine)
  registerK8sNodeTypes(engine)
  registerPipelineTypes(engine)
  registerFileNodeTypes(engine)
  registerK8sSynthEdgeTypes(engine)
  registerDockerfileRecipeTypes(engine)
  registerTunnelConfigRecipeTypes(engine)

  engine.registerProducer(packageNodeProducer)
  engine.registerProducer(packageEdgeProducer)
  engine.registerProducer(k8sNodeProducer)
  engine.registerProducer(k8sEdgeProducer)
  engine.registerProducer(rbacEdgeProducer)
  engine.registerProducer(pipelineNodeProducer)
  engine.registerProducer(pipelineEdgeProducer)
  engine.registerProducer(fileNodeProducer)
  engine.registerProducer(packageContainsFileEdgeProducer)
  engine.registerProducer(tsFileEdgeProducer)
  engine.registerProducer(k8sSynthNodeProducer)
  engine.registerProducer(k8sSynthEdgeProducer)
  engine.registerProducer(dockerfileRecipeNodeProducer)
  engine.registerProducer(dockerfileRecipeEdgeProducer)
  engine.registerProducer(tunnelConfigRecipeNodeProducer)
  engine.registerProducer(tunnelConfigRecipeEdgeProducer)
}
